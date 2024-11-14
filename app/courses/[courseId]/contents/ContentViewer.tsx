'use client'

import { FileText, Video, Music } from 'lucide-react';
import { CourseContent } from './types';

interface ContentViewerProps {
  content: CourseContent;
}

export function ContentViewer({ content }: ContentViewerProps) {
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'TEXT':
        return <FileText className="h-4 w-4" />;
      case 'VIDEO':
        return <Video className="h-4 w-4" />;
      case 'AUDIO':
        return <Music className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-muted/80 to-muted/40 rounded-lg border backdrop-blur-sm">
        <div className="p-3 bg-background rounded-xl shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-800">
          {getContentTypeIcon(content.type)}
        </div>
        <div>
          <h2 className="font-semibold text-lg">{content.title}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
            <span className="inline-flex items-center gap-1.5">
              {content.type === 'TEXT' && "Textinhalt"}
              {content.type === 'VIDEO' && "Videoinhalt"}
              {content.type === 'AUDIO' && "Audioinhalt"}
              {content.type === 'H5P' && "Interaktiver Inhalt"}
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {content.type === 'TEXT' && (
            <div className="p-6">
              <div 
                className="prose dark:prose-invert max-w-none prose-img:rounded-lg prose-headings:scroll-m-20 
                  prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl 
                  prose-h4:text-lg prose-h1:mb-6 prose-h2:mb-4 prose-h3:mb-3
                  prose-p:leading-7 prose-p:mb-4 prose-a:text-primary hover:prose-a:text-primary/80
                  prose-strong:font-semibold prose-code:text-primary prose-code:bg-muted/50 prose-code:p-1 
                  prose-code:rounded prose-code:before:content-none prose-code:after:content-none"
                dangerouslySetInnerHTML={{ __html: content.content }} 
              />
            </div>
          )}
          {content.type === 'VIDEO' && (
            <div className="relative rounded-lg overflow-hidden aspect-video">
              <iframe
                src={content.content}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full shadow-lg bg-black"
              />
            </div>
          )}
          {content.type === 'AUDIO' && (
            <div className="p-6 space-y-4">
              <div className="p-4 bg-muted rounded-lg border">
                <audio 
                  src={content.content} 
                  controls 
                  className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}
          {content.type === 'H5P' && (
            <div className="relative rounded-lg overflow-hidden aspect-video">
              <iframe
                src={`/h5p/embed/${content.content}`}
                className="absolute top-0 left-0 w-full h-full shadow-lg bg-background"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}