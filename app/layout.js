export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* UserWay Accessibility Widget */}
        <script
          src="https://cdn.userway.org/widget.js"
          data-account="kmoNJ8LbJN"
          async
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
