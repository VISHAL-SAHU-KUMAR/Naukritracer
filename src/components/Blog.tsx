import { Calendar, Clock, ChevronRight } from 'lucide-react';

export function Blog() {
  const blogPosts = [
    {
      title: "The Future of Work: AI and Career Development",
      excerpt: "Discover how artificial intelligence is shaping the future of career development and job searching.",
      author: "Sarah Johnson",
      date: "2025-07-15",
      readTime: "5 min read",
      category: "Career Tech",
      image: "https://source.unsplash.com/random/800x600?ai"
    },
    {
      title: "10 Essential Skills for 2025 Job Market",
      excerpt: "Stay ahead of the curve with these must-have skills that employers are looking for in 2025.",
      author: "Michael Chen",
      date: "2025-07-14",
      readTime: "8 min read",
      category: "Career Growth",
      image: "https://source.unsplash.com/random/800x600?skills"
    },
    {
      title: "How to Ace Your Remote Job Interview",
      excerpt: "Master the art of virtual interviews with these proven tips and strategies.",
      author: "Emily Rodriguez",
      date: "2025-07-13",
      readTime: "6 min read",
      category: "Interview Tips",
      image: "https://source.unsplash.com/random/800x600?interview"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Blog Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Career Hub Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Expert insights, tips, and strategies to help you navigate your career path
          and achieve professional success.
        </p>
      </div>

      {/* Featured Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['All', 'Career Tech', 'Career Growth', 'Interview Tips', 'Job Search', 'Leadership'].map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900 dark:hover:text-blue-300 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <article
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <button className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  Read More
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Never Miss an Article
        </h2>
        <p className="text-white text-opacity-90 mb-6 max-w-2xl mx-auto">
          Get the latest career insights and tips delivered straight to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
