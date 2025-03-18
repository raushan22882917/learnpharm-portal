
import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface FeedbackFormProps {
  contentId?: string;
  contentType?: string;
  compact?: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  contentId, 
  contentType = 'general',
  compact = false 
}) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(!compact);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback('');
      if (compact) setExpanded(false);
      
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });
    }, 1000);
  };

  if (compact && !expanded) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-10 w-10 p-0 fixed bottom-6 right-6 shadow-lg"
              onClick={() => setExpanded(true)}
            >
              <MessageSquare size={20} />
              <span className="sr-only">Open feedback form</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Provide feedback</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className={`
      glass-panel p-4 overflow-hidden
      ${compact ? 
        'fixed bottom-6 right-6 w-80 shadow-lg animate-scale-in z-50' : 
        'w-full'
      }
    `}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium flex items-center">
          <MessageSquare size={16} className="mr-2" />
          Share Your Feedback
        </h3>
        {compact && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0 rounded-full"
            onClick={() => setExpanded(false)}
          >
            <span className="sr-only">Close</span>
            <span aria-hidden="true">&times;</span>
          </Button>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder="How can we improve this content?"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="resize-none mb-3 bg-white/50"
          rows={3}
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="sm" 
            disabled={isSubmitting || !feedback.trim()}
            className="gap-1"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
            <Send size={14} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
