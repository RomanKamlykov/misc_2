<template>
  <div class="container mx-auto bg-white shadow-lg p-5 max-w-screen-md h-full min-h-full">
    <nav class="flex justify-between mb-4">
        <ul>
          <li><a href="/">🏠</a></li>
        </ul>
        <ul>
          <li><a href="/pages-tree">🌳</a></li>
        </ul>
      </nav>

      <div class="mb-4">
        <h3 class="text-lg font-semibold leading-8">Pages <span class="text-sm">📚</span></h3>
        <ul>
          <li><span class="text-sm">➕</span>
            <form action="/page" method="POST" style="display: inline;">
              <input type="hidden" name="parentId" value="0" />
              <button type="button" type="submit">Add a page</button>
            </form>
          </li>
        </ul>
      </div>
      
      <div class="mb-4">
        <h3 class="text-lg font-semibold leading-8">Search <span class="text-sm">🔎</span></h3>
        <form action="/search" method="GET">
          <input type="text" name="search" id="search" class="border border-gray-500" />
          <button type="submit" class="border border-gray-500 px-3 bg-gray-300 hover:bg-gray-200">Search</button>
        </form>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold leading-8">Recent <span class="text-sm">⏳</span></h3>
        <ul>
        </ul>
      </div>

    </div>
</template>
