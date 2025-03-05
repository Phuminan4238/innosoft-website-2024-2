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

        {/* Google Tag Manager */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EFZNGWM7VT"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EFZNGWM7VT');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
