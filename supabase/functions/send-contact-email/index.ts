import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  area: string;
  budget: string;
  timeline: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const formData: ContactFormData = await req.json();

    const projectTypeLabels: Record<string, string> = {
      residential: "Жилищен комплекс",
      commercial: "Търговски обект",
      public: "Обществено пространство",
      private: "Частна градина",
      park: "Парк",
      other: "Друго",
    };

    const budgetLabels: Record<string, string> = {
      "under-10k": "До 10,000 лв",
      "10k-25k": "10,000 - 25,000 лв",
      "25k-50k": "25,000 - 50,000 лв",
      "50k-100k": "50,000 - 100,000 лв",
      "over-100k": "Над 100,000 лв",
    };

    const timelineLabels: Record<string, string> = {
      urgent: "Спешно (до 1 месец)",
      "1-3months": "1-3 месеца",
      "3-6months": "3-6 месеца",
      flexible: "Гъвкав график",
    };

    const emailBody = `
Нова заявка за проект от Park Decor уебсайт

ИМЕ: ${formData.name}
ИМЕЙЛ: ${formData.email}
ТЕЛЕФОН: ${formData.phone}

ВИД ПРОЕКТ: ${projectTypeLabels[formData.projectType] || formData.projectType}
ПЛОЩ НА ТЕРЕНА: ${formData.area || "Не е посочено"} кв.м
БЮДЖЕТ: ${budgetLabels[formData.budget] || "Не е посочено"}
СРОК ЗА РЕАЛИЗАЦИЯ: ${timelineLabels[formData.timeline] || "Не е посочено"}

ДОПЪЛНИТЕЛНА ИНФОРМАЦИЯ:
${formData.message || "Няма допълнителна информация"}

---
Това съобщение е изпратено автоматично от контактната форма на park-decor.com
    `.trim();

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
    .header { background: #4a5f52; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #4a5f52; display: block; margin-bottom: 5px; }
    .value { color: #555; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Нова заявка за проект</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Име и Фамилия:</span>
        <span class="value">${formData.name}</span>
      </div>
      <div class="field">
        <span class="label">Имейл:</span>
        <span class="value">${formData.email}</span>
      </div>
      <div class="field">
        <span class="label">Телефон:</span>
        <span class="value">${formData.phone}</span>
      </div>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
      <div class="field">
        <span class="label">Вид проект:</span>
        <span class="value">${projectTypeLabels[formData.projectType] || formData.projectType}</span>
      </div>
      <div class="field">
        <span class="label">Площ на терена:</span>
        <span class="value">${formData.area || "Не е посочено"} кв.м</span>
      </div>
      <div class="field">
        <span class="label">Бюджет:</span>
        <span class="value">${budgetLabels[formData.budget] || "Не е посочено"}</span>
      </div>
      <div class="field">
        <span class="label">Срок за реализация:</span>
        <span class="value">${timelineLabels[formData.timeline] || "Не е посочено"}</span>
      </div>
      ${formData.message ? `
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
      <div class="field">
        <span class="label">Допълнителна информация:</span>
        <p class="value" style="white-space: pre-wrap;">${formData.message}</p>
      </div>
      ` : ''}
    </div>
    <div class="footer">
      <p>Това съобщение е изпратено автоматично от контактната форма на park-decor.com</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: ["alek10bg@gmail.com"],
        reply_to: formData.email,
        subject: `Нова заявка за проект от ${formData.name}`,
        text: emailBody,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      console.error("Resend API error:", error);
      console.error("Resend API status:", resendResponse.status);
      return new Response(
        JSON.stringify({
          error: "Failed to send email",
          details: error,
          status: resendResponse.status
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
