import React, { ComponentPropsWithoutRef } from 'react';

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => <h1 className="text-3xl sm:text-4xl font-semibold mt-10 mb-6 text-ink" {...props} />,
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 className="text-2xl sm:text-3xl font-semibold mt-10 mb-4 text-ink" {...props} />,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className="text-xl font-semibold mt-8 mb-4 text-ink" {...props} />,
  p: (props: ComponentPropsWithoutRef<'p'>) => <p className="text-lg leading-relaxed text-muted mb-6" {...props} />,
  a: (props: ComponentPropsWithoutRef<'a'>) => <a className="text-verified underline hover:text-ink transition-colors" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="border-l-[3px] border-verified pl-6 py-1 my-8 italic text-lg text-ink bg-verified/5 rounded-r-lg" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => <code className="font-mono text-[0.9em] bg-black/5 text-ink px-1.5 py-0.5 rounded" {...props} />,
  pre: (props: ComponentPropsWithoutRef<'pre'>) => <pre className="bg-ink text-paper p-6 rounded-lg overflow-x-auto my-8 font-mono text-sm leading-relaxed" {...props} />,
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-lg text-muted" {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-lg text-muted" {...props} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="pl-2" {...props} />,
  hr: (props: ComponentPropsWithoutRef<'hr'>) => <hr className="border-rule my-10" {...props} />,
};
