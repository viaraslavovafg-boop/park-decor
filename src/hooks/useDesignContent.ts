import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface DesignContent {
  id: string;
  project_number: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export function useDesignContent(projectNumber: number) {
  const [content, setContent] = useState<DesignContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [projectNumber]);

  async function fetchContent() {
    try {
      const { data, error } = await supabase
        .from('design_content')
        .select('*')
        .eq('project_number', projectNumber)
        .maybeSingle();

      if (error) throw error;
      setContent(data);
    } catch (error) {
      console.error('Error fetching design content:', error);
    } finally {
      setLoading(false);
    }
  }

  return { content, loading, refetch: fetchContent };
}
