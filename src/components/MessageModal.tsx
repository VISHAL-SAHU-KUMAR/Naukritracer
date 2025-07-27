import React, { useState } from 'react';
import { Send, X, Loader, MessageCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  recipientName?: string;
}

export const MessageModal: React.FC<Props> = ({ isOpen, onClose, onSend, recipientName }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }

    setIsSending(true);
    try {
      await onSend(message);
      setMessage('');
      // Success message will be handled by parent component
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Send Message
              </h2>
              {recipientName && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  to {recipientName}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              disabled={isSending}
            />
            <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{message.length}/500 characters</span>
              <span>Press Shift+Enter for new line</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
          <button
            onClick={onClose}
            disabled={isSending}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              !message.trim() || isSending
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSending ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};