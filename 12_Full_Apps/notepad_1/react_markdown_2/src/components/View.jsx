import React from 'react';
import NavView from './_NavView';
import Page from './_Page';
import ChildPages from './_ChildPages';

export default function View() {
  return (
    <div className="view sheet">
      <NavView />
      <Page />
      <ChildPages />
    </div>
  );
}
