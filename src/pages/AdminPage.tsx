import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, WebsiteImage } from '../lib/supabase';
import { LogOut, Upload, Trash2, Save, Image as ImageIcon, FileText } from 'lucide-react';
import type { DesignContent } from '../hooks/useDesignContent';

export default function AdminPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState<WebsiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [designContent, setDesignContent] = useState<DesignContent[]>([]);
  const [editingContent, setEditingContent] = useState<Record<number, { title: string; description: string }>>({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadImages();
    loadDesignContent();
  }, [user, navigate]);

  const loadDesignContent = async () => {
    const { data, error } = await supabase
      .from('design_content')
      .select('*')
      .order('project_number', { ascending: true });

    if (error) {
      console.error('Error loading design content:', error);
    } else {
      setDesignContent(data || []);
      const editing: Record<number, { title: string; description: string }> = {};
      data?.forEach(content => {
        editing[content.project_number] = {
          title: content.title,
          description: content.description
        };
      });
      setEditingContent(editing);
    }
  };

  const loadImages = async () => {
    const { data, error } = await supabase
      .from('website_images')
      .select('*')
      .in('category', ['design_projects', 'carousel', 'project_showcase', 'team'])
      .order('category', { ascending: true })
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error loading images:', error);
    } else {
      setImages(data || []);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const handleImageUpload = async (imageId: string, file: File) => {
    setUploading(imageId);
    setSuccessMessage('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${imageId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('website-images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('website_images')
        .update({ url: publicUrl, updated_at: new Date().toISOString() })
        .eq('id', imageId);

      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error(`Database update failed: ${updateError.message}`);
      }

      setSuccessMessage('Снимката е качена успешно!');
      await loadImages();
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert(`Грешка: ${error.message || 'Неизвестна грешка'}`);
    } finally {
      setUploading(null);
    }
  };

  const handleUrlUpdate = async (imageId: string, newUrl: string) => {
    try {
      const { error } = await supabase
        .from('website_images')
        .update({ url: newUrl, updated_at: new Date().toISOString() })
        .eq('id', imageId);

      if (error) throw error;

      setSuccessMessage('URL адресът е обновен успешно!');
      await loadImages();
    } catch (error) {
      console.error('Error updating URL:', error);
      alert('Грешка при обновяване на URL адреса');
    }
  };

  const handleAltTextUpdate = async (imageId: string, newAltText: string) => {
    try {
      const { error } = await supabase
        .from('website_images')
        .update({ alt_text: newAltText, updated_at: new Date().toISOString() })
        .eq('id', imageId);

      if (error) throw error;

      setSuccessMessage('Алтернативният текст е обновен!');
      await loadImages();
    } catch (error) {
      console.error('Error updating alt text:', error);
      alert('Грешка при обновяване на алтернативния текст');
    }
  };

  const handleContentUpdate = async (projectNumber: number) => {
    const content = editingContent[projectNumber];
    if (!content) return;

    try {
      const { error } = await supabase
        .from('design_content')
        .update({
          title: content.title,
          description: content.description,
          updated_at: new Date().toISOString()
        })
        .eq('project_number', projectNumber);

      if (error) throw error;

      setSuccessMessage(`Проект ${projectNumber} е обновен успешно!`);
      await loadDesignContent();
    } catch (error) {
      console.error('Error updating design content:', error);
      alert('Грешка при обновяване на съдържанието');
    }
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      design_projects: 'Проектиране - Снимки на проекти',
      carousel: 'Начална страница - Карусел',
      project_showcase: 'Начална страница - Изложба на проекти',
      team: 'Екип - Снимки на Вяра и Петко',
    };
    return names[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl text-slate-600">Зареждане...</div>
      </div>
    );
  }

  const groupedImages = images.reduce((acc, img) => {
    if (!acc[img.category]) acc[img.category] = [];
    acc[img.category].push(img);
    return acc;
  }, {} as Record<string, WebsiteImage[]>);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Управление на снимки</h1>
            <p className="text-sm text-slate-600 mt-1">Добре дошли, {user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Изход
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Проектиране - Текстово съдържание
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {designContent.map((content) => (
              <div key={content.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-700">Проект {content.project_number} / 04</h3>
                  <button
                    onClick={() => handleContentUpdate(content.project_number)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Запази
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Заглавие
                    </label>
                    <input
                      type="text"
                      value={editingContent[content.project_number]?.title || ''}
                      onChange={(e) => {
                        setEditingContent(prev => ({
                          ...prev,
                          [content.project_number]: {
                            ...prev[content.project_number],
                            title: e.target.value
                          }
                        }));
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Въведете заглавие"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Описание
                    </label>
                    <textarea
                      value={editingContent[content.project_number]?.description || ''}
                      onChange={(e) => {
                        setEditingContent(prev => ({
                          ...prev,
                          [content.project_number]: {
                            ...prev[content.project_number],
                            description: e.target.value
                          }
                        }));
                      }}
                      rows={6}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Въведете описание"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedImages).map(([category, categoryImages]) => (
            <div key={category} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 px-6 py-4">
                <h2 className="text-xl font-bold text-white">{getCategoryName(category)}</h2>
              </div>

              <div className="p-6 space-y-6">
                {categoryImages.map((image) => (
                  <div key={image.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                          {image.url ? (
                            <img
                              src={image.url}
                              alt={image.alt_text}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '';
                                e.currentTarget.className = 'hidden';
                              }}
                            />
                          ) : (
                            <ImageIcon className="w-16 h-16 text-slate-300" />
                          )}
                        </div>

                        <label className="block">
                          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                            <Upload className="w-4 h-4" />
                            Качи нова снимка
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(image.id, file);
                            }}
                            disabled={uploading === image.id}
                            className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer disabled:opacity-50"
                          />
                        </label>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Име
                          </label>
                          <div className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 text-sm">
                            {image.alt_text || image.key}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            URL адрес
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              defaultValue={image.url}
                              onBlur={(e) => {
                                if (e.target.value !== image.url) {
                                  handleUrlUpdate(image.id, e.target.value);
                                }
                              }}
                              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              placeholder="Поставете URL адрес тук"
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Може да поставите външен линк или да качите файл
                          </p>
                        </div>
                      </div>
                    </div>

                    {uploading === image.id && (
                      <div className="mt-4 text-center text-blue-600 font-medium">
                        Качване на снимката...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">Как да използвам системата:</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Изберете снимка от вашия компютър и тя ще се качи автоматично</li>
            <li>Можете да въведете URL адрес на външна снимка вместо да качвате файл</li>
            <li>Промените в URL и алтернативния текст се запазват автоматично при излизане от полето</li>
            <li>Всички снимки се показват на сайта в реално време</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
