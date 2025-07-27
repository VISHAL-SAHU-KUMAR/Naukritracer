export function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Cookie Policy</h1>
      <div className="prose prose-lg dark:prose-invert">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h3>What are Cookies?</h3>
        <p>Cookies are small pieces of data stored on your device when you browse websites.</p>
        <h3>How We Use Cookies</h3>
        <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.</p>
        <h3>Your Choices</h3>
        <p>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.</p>
      </div>
    </div>
  );
}