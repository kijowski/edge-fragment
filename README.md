# Edge.js fragment

[![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

This package introduces concept of template fragments described on [HTMX website](https://htmx.org/essays/template-fragments/) to Edge.js templating.


## Instalation
Install and configure it in two steps.

```bash
# npm
npm i edge-fragment
node ace configure edge-fragment
```

Or use `ace add` command that combines those two steps:
```bash
node ace add edge-fragment
```


## Usage
Library adds `@fragment` tag that you can use to describe fragment of template that you might want to render separately. The fragment tag in itself does not affect final result when you render the whole file.

Fragment tag takes one argument - name of the fragment:
```html
<header>Some header</header>
@fragment("content")
My awesome content
@end
<footer>Some footer</footer>
```
Now you can render template fragment by appending its id at the end after `#`:

```ts
// Render full template
async function full({ view }: HttpContext) {
  return view.render('path/to/template', { data })
}

// Render only template fragment
async function contentOnly({ view }: HttpContext) {
  return view.render('path/to/template#content', { data })
}
```

## Notes about fragment extraction
Please note that fragments are extracted out of the template file before the template evaluation. Because of that you can define fragment in any place of template file, including inside other tags like `@each` or `@if`:
```html
@let(variable = 5)
@each(item in collection)
  @fragment('item-body')
    <b>{{ item.content }}</b>
  @end
  @if(item.error)
    @fragment('item-error')
      <p>Got error: {{ item.error }}</p>
      Variable is {{ variable }}
    @end
  @end
@end
```
There are two main things worth keeping in mind:
- when rendering the fragment you need to supply it with data in correct format eg. `view.render('path/to/template#item-body', { item })`
- there is no data passing from template to fragment, so if you use some value in the fragment you need to explicitly provide it during rendering eg. `view.render('path/to/template#item-error', { item, variable })`

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"

[license-image]: https://img.shields.io/npm/l/edge-fragment?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md 'license'

[npm-image]: https://img.shields.io/npm/v/edge-fragment.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/edge-fragment 'npm'
