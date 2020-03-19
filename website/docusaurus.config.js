module.exports = {
  title: 'Zuze',
  tagline: 'Composable/configurable validation schema',
  url: 'https://zuze-lab.github.io',
  baseUrl: '/schema/',
  favicon: '',
  organizationName: 'zuze-lab', // Usually your GitHub org/user name.
  projectName: 'schema', // Usually your repo name.
  themeConfig: {
    sidebarCollapsible: false,
    algolia: {
      apiKey: 'd1cff25eb35f7f1c8ab03d6c87b91fb5',
      indexName: 'zuze-lab_schema',
    },
    navbar: {
      title: '@zuze/schema',
      // logo: {
      //   alt: 'Zuze',
      //   src: 'img/logo.svg',
      // },
      links: [
        { to: 'docs/getting-started', label: 'Docs', position: 'left' },
        {
          href: 'https://github.com/zuze-lab/schema',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Other zuze projects',
          items: [
            {
              label: 'interpolate',
              to: 'https://github.com/zuze-lab/interpolate',
            },
            {
              label: 'd-queue',
              to: 'https://github.com/zuze-lab/d-queue',
            },
            {
              label: 'modifiable',
              to: 'https://github.com/zuze-lab/modifiable',
            },
            // {
            //   label: 'modifiable',
            //   to: 'https://github.com/zuze-lab/modifiable',
            // },
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/getting-started',
            },
            {
              label: 'Validating',
              to: 'docs/validating',
            },
            // {
            //   label: 'Examples',
            //   to: 'docs/examples',
            // },
            // {
            //   label: 'API Reference',
            //   to: 'docs/api',
            // },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/zuze-schema',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/zuze-lab/schema',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Zuze, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/zuze-lab/schema/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
