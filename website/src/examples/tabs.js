import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { mdx } from '@mdx-js/react';

export const ZuzeTabs = ({ groupId, children, tabs, default: def }) => (
  <Tabs
    groupId={groupId}
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
      <ZuzeTabs groupId="ast-fn" tabs={['ast', 'functional']}>
        {children}
      </ZuzeTabs>
      {link && (
        <>
          <a target="_blank" href={link}>
            Try it on CodeSandbox!
          </a>
          <hr />
          <br />
        </>
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
