# Code review

1. During the installation vulnerabilities were found (7 low and 5 high) - fixed most critical of them (updated `@nrwl/nest`, `@nrwl/node` and `@nrwl/workspace` to relevant versions)

2. Added new script `test:coverage` - can be run by this command - `npm run test:coverage` - generates unit tests coverage folder with UT coverage report allows to better track average app UT coverage

3. Realized that on saving some files formatting were changed, so added couple rules to `.prettierrc` file:

   1. Trailing comma - none

   2. Arrow parenthesis always - it is default one with the latest version of prettier but I realized that in some files parenthesis were aded and in some not for arrow functions, so I decided to define it in `.prettierrc` After that checked all files in `libs/api` and `libs/books` folder to have arrow parenthesis

4. Removed unused `OnInit` from `total-count` component

5. In same places `ternary operators` were used and in other just `if/else` - better to have same approach across app

6. `removeFromReadingList` in `reading-list` component should have a type definition for passed parameter and it will be better to name that parameter as `book` instead of `item` to be consistent and more meaningful

7. Need to unsubscribe from subscriptions in `ts` files by using `OnDestroy` hook by using either wrapping subscription and pushing it to the Subscriptions array and map over the array and call `unsubscribe` in `OnDestroy` ot by using `takeUntil` provided by `rxjs` and some subject like `ngDestroyed$` or `| async` pipe should be used

8. All functions/methods in components should have return type definitions

9. Images used in html templates should have `alt` attributes

10. `formatDate` function in `book-search` component should return something more implicit than `undefined`. [Angular DatePipe](https://angular.io/api/common/DatePipe) can be consider to use instead

11. Fixed `search` typo in `books.service.ts` file - it will be better to have locally for text editor spell checker extension

12. Changed describe text in `reading-list.reducer.spec.ts` file to `Reading-list` instead of `Book`

13. Fixed failing unit tests for `reading-list.reducer.spec.ts` file

## Nice to have / future improvements

1. SCSS linting - alphabetize SCSS properties - can be used [stylelint-order](https://www.npmjs.com/package/stylelint-order) package.

2. Add pre-commit hooks for linting and unit testing - can be used [husky](https://www.npmjs.com/package/husky) package.

3. Overall naming convention for folders/files/function/properties should be meaningful and straightforward - so, any developer who looks in the code for the first time suppose to understand it. Definitely, `feature` folder should be renamed to something more meaningful. Also, interfaces are usually prefixed with capital `I` for better understanding that it is an interface

4. It will be nice to name `+state` folder differently - `ngrx` provides [that option](https://github.com/nrwl/nx/pull/137)

5. Organize/ structured files better - `api` folder (controllers can be splitted by separate folders (books and reading-list)), same with `+state` folder. When app will become bigger it will be nice to split models by separate files as well (for now it is not an issue because it is only 2 interfaces but for future it is definitely a must have)

6. It was quite complicated from the first look to understand app structure/architecture, even by using `npx nx dep-graph` - it is still will be nice to have a section in README.md file that highlighted at least high level app architecture or major blocks/elements.

## Accessibility

Lighthouse accessibility score before changes - 87

1. Added `area-label` to `Search` button in `book-search` component

2. Fix contrast color for `$pink-accent` used [web safe suggested color](https://convertingcolors.com/hex-color-E20074.html)

Lighthouse accessibility score after changes - 100

Manual accessibility fixes:

1. Missing `alt` tags for images

2. `Try searching for a topic, for example` added `tabindex` and `keydown.enter` event

3. Added `area-label` to `Want to Read` button in `book-search` component

Overall accessability looks good - checked with Lighthouse, Axe and WAVE
