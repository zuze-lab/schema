import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { mdx } from '@mdx-js/react';

export const ZuzeTabs = ({ children, tabs, default: def }) => (
  <Tabs
    defaultValue={def || tabs[0]}
    values={tabs.map(t => ({ label: t, value: t }))}
  >
    {tabs.map((t, i) => (
      <TabItem key={t} value={t}>
        {children[i]}
      </TabItem>
    ))}
  </Tabs>
);

export const AstFn = ({ children, link }) => {
  return (
    <>
      <ZuzeTabs tabs={['ast', 'functional']}>{children}</ZuzeTabs>
      {link && (
        <a target="_blank" href={link}>
          Try it on CodeSandbox!
        </a>
      )}
    </>
  );
};

const makeMdxCode = (code, lang, live) =>
  mdx('pre', {
    children: mdx('code', {
      live,
      className: `language-${lang}`,
      children: code.trim(),
    }),
  });
