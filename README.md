# @freshheads/javascript-essentials

A library containing javascript utilities that we until now often copy between projects and want to be make easier accessible.

## Installation

```bash
npm install git+ssh://git@github.com:freshheads/freshheads-javascript-essentials.git#semver:^1.3 --save
```

## TOC

-   [Utilities](#Utilities)
    -   [Array](#array)
        -   [`createRangeArray`](#createrangearray)
        -   [`groupResultsByCallback`](#groupresultsbycallback)
        -   [`groupObjectArrayByObjectKey`](#groupobjectarraybyobjectkey)
        -   [`chunkArray`](#chunkArray)
    -   [String](#string)
        -   [`replacePlaceholdersInString`](#replaceplaceholdersinstring)
        -   [`truncatePreservingWords`](#truncatepreservingwords)
        -   [`createFullNameFromParts`](#createfullnamefromparts)
        -   [`removeLineBreaks`](#removelinebreaks)
    -   [Colors](#colors)
        -   [`isValidHexColor`](#isvalidhexcolor)
        -   [`convertHexToRGB`](#converthextorgb)
    -   [Logger](#logger)
        -   [`createNamespacedLogger`](#createnamespacedlogger)
    -   [`RestartableTimeout`](#restartabletimeout)
    -   [`PromiseQueue`](#promisequeue)
    -   [`dataLayer`](#datalayer)
        -   [`pushTrackingEvent`](#pushtrackingevent)
-   [React](#react)
    -   [Components](#components)
        -   [`ErrorBoundary`](#errorboundary)
    -   [Hooks](#hooks)
        -   [`useStateWithRef`](#usestatewithref)
        -   [`useScrollToTopOnDependencyChange`](#usescrolltotopondependencychange)
        -   [`useTrackingProps`](#usetrackingprops)
        -   [`usePromiseEffect`](#usepromiseeffect)
        -   [`useStateUntilUnmount`](#usestateuntilunmount)
-   [Storage](#storage)
    -   [`localStorage`](#localstorage)
    -   [`sessionStorage`](#sessionstorage)
    -   [`cookieStorage`](#cookiestorage)
-   [Cache](#cache)
    -   [`createInMemoryCache`](#createinmemorycache)
-   [Types](#types)
    -   [`Serializable`](#serializable)

## Utilities

### Array

#### `createRangeArray`

Can be used to create an array with a range of numbers in it from the supplied `from` to the `until` value. Optionallly a `step` parameter can be supplied to control the steps taken between the `from` and `until` when generating the range.

Usage:

```javascript
import { createRangeArray } from '@freshheads/javascript-essentials/build/utilities/arrayUtilities';

createRangeArray(2, 7); // returns [2, 3, 4, 5, 6, 7]
createRangeArray(2, 7, 2); // returns [2, 4, 6]
```

#### `groupResultsByCallback`

Takes an array and groups the items in it by looping through it and resolving the group key for it.

Usage:

```typescript
import { groupResultsByCallback } from '@freshheads/javascript-essentials/build/utilities/arrayUtilities';

type ItemType = { title: string; type: string };

const items: Array<ItemType> = [
    {
        title: 'Some title',
        type: 'blogpost',
    },
    {
        title: 'Other title',
        type: 'blogpost',
    },
    {
        title: 'Another value',
        type: 'newsArticle',
    },
];

const result = groupResultsByCallback<ItemType>(items, (item) => item.type);

// Output:
//
// [
//     blogpost: [
//         {
//              title: 'Some title',
//              type: 'blogpost',
//         },
//         {
//             title: 'Other title',
//             type: 'blogpost',
//         }
//     ],
//     newsArticle: [
//         {
//             title: 'Another value',
//             type: 'newsArticle',
//         }
//     ]
// ]
```

#### `groupObjectArrayByObjectKey`

Takes an array of objects and sorts it by grouping objects that have the same key value. If the key is not present in one of the items, it is added to the 'other' category.

Usage:

```typescript
import { groupObjectArrayByObjectKey } from '@freshheads/javascript-essentials/build/utilities/arrayUtilities';

type ItemType = { title: string; type?: string };

const items: Array<ItemType> = [
    {
        title: 'Some title',
        type: 'blogpost',
    },
    {
        title: 'Other title',
        type: 'blogpost',
    },
    {
        title: 'Another something',
    },
];

const result = groupObjectArrayByObjectKey<ItemType>(items, 'type');

// Output:
//
// [
//     blogpost: [
//         {
//              title: 'Some title',
//              type: 'blogpost',
//         },
//         {
//             title: 'Other title',
//             type: 'blogpost',
//         }
//     ],
//     other: [
//         {
//             title: 'Another value',
//             type: 'newsArticle',
//         }
//     ]
// ]
```

#### `chunkArray`

Given an array and chunk size, divide the array into many subarrays where each subarray is of length size.

Usage:

```typescript
import { chunkArray } from '@freshheads/javascript-essentials/build/utilities/arrayUtilities';

const items: any[] = [0, 1, 2, 3, 4, 5, 6];
const chunkedArray: Array<Array<any>> = chunkArray(items, 3);

// output
//
// [ [ '0', '1', '2' ], [ '3', '4', '5' ], [ '6' ] ]
```

### String

#### `replacePlaceholdersInString`

Takes a string with placeholders and it's replacements and returns a new string with the placeholders replaced. Placeholder replacements can be string, numbers or callback functions returning a string or a number.

Usage:

```javascript
import { replacePlaceholdersInString } from '@freshheads/javascript-essentials/build/utilities/stringUtilities';

const first = 1;
const second = '3';

const output = replacePlaceholdersInString('{first} + {second} = {outcome}', {
    '{first}': first,
    '{second}': second,
    '{outcome}': () => first + parseInt(second),
});

// returns: '1 + 3 = 4''
```

#### `truncatePreservingWords`

Truncates a string, but makes sure that individual words are not cut-off somewhere in the middle.

Usage:

```typescript
// output = 'some short…'
const truncatedString = truncatePreservingWords('some short string', 14);
```

#### `createFullNameFromParts`

Takes parts of a name and creates a full name out of it.

Usage:

```typescript
import { createFullNameFromParts } from '@freshheads/javascript-essentials/build/utilities/stringUtilities';

// Output: 'Peter van der Sanden'
createFullNameFromParts('Peter', 'van der', 'Sanden');

// Output: 'Peter Jansen'
createFullNameFromParts('Peter', null, 'Jansen');
```

#### `removeLineBreaks`

Removes line breaks from a string and replaces them with something else.

Usage:

```typescript
import { removeLineBreaks } from '@freshheads/javascript-essentials/build/utilities/stringUtilities';

// Output: 'Eerste regel. Tweede regel'
removeLineBreaks('Eerste regel\\r\\nTweede regel', '. ');
```

### Colors

#### `isValidHexColor`

Takes a string and validates if it is a valid HEX color.

Usage:

```typescript
import { isValidHexColor } from '@freshheads/javascript-essentials/build/utilities/colorUtilities';

isValidHexColor('#ff9900'); // output: true
```

#### `convertHexToRGB`

Converts a HEX color string to a rgb(a) color string, applying alpha if needed.

Usage:

```typescript
import { convertHexToRGB } from '@freshheads/javascript-essentials/build/utilities/colorUtilities';

convertHexToRGB('#ff9900'); // output: rgb(255,153,0)
```

### Logger

#### `createNamespacedLogger`

Creates a logger that prefixes every log that is send to it with a specific key. This makes easier to scan for logs in the console. If used with namespace `security` for instance, it logs: `[SECURITY] other stuff you logged`.

Usage:

```javascript
const logger = createNamespacedLogger('security');

const credentials = ['ROLE_USER', 'ROLE_ADMIN'];

// should output [SECURITY] credentials ['ROLE_USER', 'ROLE_ADMIN'] in the consolecreate
logger.info(credentials, 'credentials', credentials);
```

### `RestartableTimeout`

A restartable timeout with a clear interface, that allows for callback chaining (and stopping the chain at any time).

Usage:

```typescript
import RestartableTimeout from '@freshheads/javascript-essentials/build/utilities/RestartableTimeout';

const timeout = new RestartableTimeout(1000); // 1 second timeout

timeout.addCallback(() => {
    // do something, executed second
});

timeout.addCallback((next) => {
    // do something, executed first

    next(); // calls the previous callback (and can be ommited if required)
});

timeout.start();
timeout.restart();()
timeout.stopAndReset();
```

### PromiseQueue

Sometimes promises need to be executed one after another. For instance when you want a set of API requests to be executed one after another, to ensure that the order of the responses is not dependent on the response times of the requested API's endpoints.

Usage:

```typescript
import RequestQueue from '@freshheads/javascript-essentials/build/utilities/PromiseQueue';

const queue = new PromiseQueue();

queue
    .add<ResponseType>(() => { // execute some ajax request })
    .then((response) => {
        // handle response from the API
    })
    .catch(error => {
        // handle any error
    });

queue
    .add<SecondResponseType>(() => { // execute some ajax request })
    .then((response) => {
        // handle response from the API
    })
    .catch(error => {
        // handle any error
    });

// further utility functions:
queue.length; // returns the current length of the queue
queue.started; // returns true if started
```

### dataLayer

#### `pushTrackingEvent`

Pushes an event to the dataLayer to be picked up by Google Tag Manager, in a standardized format.

Usage:

```typescript
import { pushTrackingEvent } from '@freshheads/javascript-essentials/build/utilities/dataLayer';

pushTrackingEvent('preorder', 'submit', { subscribeToNewsletter: false });
```

## React

### Components

#### `ErrorBoundary`

Re-usable `ErrorBoundary` for React projects. Catches uncaught errors in child components, and displays the fallback component instead. An error listener can also be supplied to use for instance when you want to log the error.

Usage:

```javascript
import ErrorBoundary from '@freshheads/javascript-essentials/build/react/components/ErrorBoundary';

const YourApp = () => {
    const onErrorOccurred: OnErrorOccurredHandler = (error, errorInfo) =>
        pushErrorToSomeCentralLoggingSystem(error, errorInfo);

    return (
        <ErrorBoundary
            renderFallback={(error, errorInfo) => (
                <YourCustomErrorInformationDisplay
                    error={error}
                    errorInfo={errorInfo}
                />
            )}
            onErrorOccurred={onErrorOccurred}
        >
            <SomeComponentThatMightThrowAnError />
        </ErrorBoundary>
    );
};
```

### Hooks

#### `useStateWithRef`

Useful as an fix for [stale callbacks](https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function). It's a hook that syncs a state and a ref internally, so that we are always able to access the latest version of a state through the ref, but still have the state to cause re-render as expected.

Usage:

```typescript
import useStateWithRef from '@freshheads/javascript-essentials/build/react/hooks/useStateWithRef';

const myComponent: Reat.FC = () => {
    // Can be used pretty much like `getState()` except `getState` is a function
    const { getState, setState } = useStateWithRef<number>(0);
};
```

#### `useScrollToTopOnDependencyChange`

Scrolls to top when one of the supplied dependencies changes. Can be used for instance in combination with location. If no arguments are supplied, the hook only scrolls to top on mount.

Usage:

```typescript
import useScrollToTopOnDependencyChange from '@freshheads/javascript-essentials/build/react/hooks/useScrollToTopOnDependencyChange';

const location = useLocation(); // react-router-dom

useScrollToTopOnDependencyChange(location.pathname, location.search);
```

#### `useTrackingProps`

Applies uniform setup for tracking events, using attributes on DOM elements. In Google Tag Manager these can be registered and used to, in turn, push events to Google Analytics or other (tracking) platforms.

Usage:

```jsx
import useTrackingProps from '@freshheads/javascript-essentials/build/react/hooks/useTrackingProps';

type Props = {
    subscribeToNewsletter: boolean,
};

const PreorderSubmitButton: React.FC<Props> = (subscribeToNewsletter) => {
    const trackingProps = useTrackingProps('preorder', 'submit', {
        subscribeToNewsletter,
    });

    return (
        <button {...trackingProps} type="submit">
            Submit
        </button>
    );
};
```

### `usePromiseEffect`

When working with promises in `useEffect()` you have many things to take into account:

-   What to render when the promise is pending
-   How to catch errors and render your error notification
-   What to render when the value is resolved

This hook helps you with the status changes and [reduces the number of re-renders required to get there](https://levelup.gitconnected.com/react-hooks-gotchas-setstate-in-async-effects-d2fd84b02305?gi=8a0b357c6dcc).

Usage:

```tsx
import usePromiseEffect from '@freshheads/javascript-essentials/build/react/hooks/usePromiseEffect';

type Props = {
    page: number
}

const ArticleOverview: React.FC<Props> => ({ page }) => {
    const { value: articles, pending, error } = usePromiseEffect<Article[]>(() => fetchArticles(), [page]);

    if (pending) {
        return <Loader />;
    }

    if (error) {
        return <Error message={error.message} />;
    }

    if (!value) {
        throw new Error('Value should be available at this point');
    }

    return (
        <div>
            { state.value.map(article => (
                <Article data={article} key={article.id} />
            )) }
        </div>
    )
}
```

### `useStateUntilUnmount`

We have all seen the warning below popup sometimes:

> Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks...

We often execute asynchronous actions (i.e. API calls) that, when finished, update some component state. When however the component that the action belongs to, is unmounted in the meantime, the no longer needed state (!) is still updated, causing the warning above. Some sort of reference to the component needs to remain in memory to allow the state change to occur, which is a memory leak in your application.

This hook ensures that, once the component is unmounted, the no longer required component state is not updated, making sure that the warning is not triggered. 

If it actually fixes the memory leak, [remains to be seen](https://gist.github.com/troygoode/0702ebabcf3875793feffe9b65da651a#gistcomment-3662958), and usage of this hook is only preferred when there is not a better solution available (or affordable), like awaiting unmount until the async action is finished. Use with care..

Usage:

```typescript jsx
import React, { useEffect } from 'react';
import useStateUntilUnmount from '@freshheads/javascript-essentials/build/react/hooks/useStateUntilUnmount'

type Props = {
    slug: string;
}

const SomeComponent: React.VFC = ({ slug }) => {
    const [isFetching, setIsFetching] = useStateUntilUnmount<boolean>(false);

    useEffect(() => {
        setIsFetching(true);
        
        fetchArticleWithSlug(slug).finally(() => {
            // normally, when this React component is unmounted, before we get
            // to this point, the React warning above would popup.
            
            setIsFetching(false);
        })
    }, [slug]);
    
    // ...
}
```

### `useLockScroll`

When a modal / popover opens you often want to lock the scroll of the body to prevent double scrollsbars.
This hook provides two types of lock solutions that are often used.

LockType.Overflow is clean and has less impact on code but is not supported in IOS / Safari
LockType.Fixed uses position fixed but remembers your scroll position to prevent jumping to top of page. Use when you need all support, could have more impact on your styles.
> More info can be found here: https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/

Usage
```typescript jsx
import useLockScroll, { LockType } from '@freshheads/javascript-essentials/build/react/hooks/useLockScroll';


const Modal = () => {
    const { isOpen, setIsOpen } = useState<boolean>(false);
    useLockScroll(LockType.Overflow, isOpen);

    // ...
}
```

> There are other solutions:
> 1. https://github.com/willmcpo/body-scroll-lock -> prevents touch events on iOS in combination with overflow
> 2. Use overscroll-behavior: contain; -> Css only but seems to have some drawbacks (good for research / first try)

## Routing

### `createPathFromRoute`

See [`replacePlaceholdersInString`](#replaceplaceholdersinstring).

Usage:

```typescript
import { createPathFromRoute } from '@freshheads/javascript-essentials/build/routing/routeGenerator';

// outputs: /blog/post/3/my-blog-post-something
const path = createPathFromRoute('/blog/post/:id/:slug', {
    ':id': 3,
    ':slug': 'my-blog-post-something',
});
```

## Storage

### `localStorage`

Even though `localStorage` has a pretty streightforward browser API, we find ourselves wrapping it in an abstraction a lot. We do this to catch errors that sometimes occur when for instance:

-   the storage is full
-   the browser security settings don't allow for local storage
-   the browser support is limited or different

The localStorage abstraction in this library catches errors if wanted and makes it possible for you to log it if the case.

Also it allows for easier retrieval of specific types, like `int` and `boolean`, as by default everything is stored and retrieved as `string`.

Usage:

```typescript
import {
    get,
    write,
} from '@freshheads/javascript-essentials/build/storage/localStorage';

// basic usage
const success = write('key', 2912);
const value = getInt('key', -1);

// with error logging
const success = write('key', 2912, true, (error) =>
    writeErrorToLoggingSystem(error)
);
const value = getInt('key', -1, true, (error) =>
    writeErrorToLoggingSystem(error)
);
```

### `sessionStorage`

See `localStorage` above for usage. The same interface is implemented.

### `cookieStorage`

See `localStorage` above for usage. The same interface is implemented.

Requirements:

-   Install [`js-cookie`](https://www.npmjs.com/package/js-cookie) as it is used underneath to easily access browser cookies.

## Cache

### `createInMemoryCache`

Factory method to create an in memory cache for values of any type. This cache is cleared with every request, and therefor mostly usable in client-side development. It also expires cache after some time, if required.

Usage:

```typescript
const entriesExpireInSeconds = 60; // 1 minute

const cache = createInMemoryCache<string>(
    'yourNamespace',
    entriesExpireInSeconds
);

// store values in cache
cache.set('someKey', 'some value');

// retrieve values from cache
const value = cache.get('someKey');

// if the cache does not contain the value, create a new value and return
// that, to be able to get and create in one command
const value = cache.getOrCreate('someKey', async () => {
    const response = await axios.get('/some-path');

    return response.data.someValue;
});

// removes a specific key
cache.remove('someKey');

// clears entire cache within this namespace
cache.clear();

// counts number of keys in cache
cache.count();
```

## Types

### `Serializable`

An interface that can be used to only allow properties that are serializable. Usable for JSON serialization or as a validation for Redux global state data.

Usage:

```typescript
import { Serializable } from '@freshheads/javascript-essentials/build/types/utility';

const toJson = (values: Serializable): string => JSON.stringify(values);

class SomeClass {}

toJson({ value: new SomeClass() }); // = typescript error
```

# Todo

-   [Money formatting](https://github.com/freshheads/013/blob/develop/assets/frontend/src/js/utility/numberUtilities.ts)
-   [Tracking utilities](https://github.com/freshheads/013/blob/develop/assets/frontend/src/js/utility/trackingUtilities.ts) (misschien ook HOC oid. `withTrackingOnClick` oid.? Of een hook?)
-   [Routing: extract path with placeholders](https://github.com/freshheads/013/blob/develop/assets/frontend/src/js/routing/utility/urlGenerator.ts#L13)
-   [Group object array preserving order](https://github.com/freshheads/freshheads-data-2.0/blob/develop/assets/frontend/src/js/components/blueprintPeriodResultOverview/utilities/resultSortingUtilities.ts)
