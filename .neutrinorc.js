module.exports = {
  use: [
    '@neutrinojs/airbnb',
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'easy-study',
          links: [
            {
              href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
              rel: 'stylesheet'
            },
            {
              href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
              rel: 'stylesheet'
            },
          ]
        }
      }
    ],
    ['@neutrinojs/karma', { client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    } }]
  ]
};
