import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useImage(key: string, fallbackUrl: string = '') {
  const [url, setUrl] = useState(fallbackUrl);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImage();
  }, [key]);

  const loadImage = async () => {
    try {
      const { data, error } = await supabase
        .from('website_images')
        .select('url')
        .eq('key', key)
        .maybeSingle();

      if (error) {
        console.error('Error loading image:', error);
        setUrl(fallbackUrl);
      } else if (data) {
        setUrl(data.url);
      } else {
        setUrl(fallbackUrl);
      }
    } catch (error) {
      console.error('Error loading image:', error);
      setUrl(fallbackUrl);
    } finally {
      setLoading(false);
    }
  };

  return { url, loading };
}

export function useImages(category?: string) {
  const [images, setImages] = useState<Array<{ key: string; url: string; alt_text: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, [category]);

  const loadImages = async () => {
    try {
      let query = supabase
        .from('website_images')
        .select('key, url, alt_text, order_index')
        .order('order_index', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading images:', error);
      } else if (data) {
        setImages(data);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  return { images, loading };
}
