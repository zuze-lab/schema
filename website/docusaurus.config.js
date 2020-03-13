module.exports = {
  title: 'Zuze',
  tagline: 'Composable/configurable validation schema (and more!)',
  url: 'https://zuze-lab.github.io',
  baseUrl: '/schema/',
  favicon: '',
  organizationName: 'zuze-lab', // Usually your GitHub org/user name.
  projectName: 'schema', // Usually your repo name.
  themeConfig: {
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
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/getting-started',
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
