# Forms Usage

1. Define interface / type consisting of the form keys and the data type

```
export type UpdateFolderDto = {
  name?: string;
  description?: string;
  tags?: AssignTagDto[];
};
```

2. Define an array of type IFormRow[] of all your form elements using the FormHelper class:

- Outer array are all form elements within the form
- One sub-array is one row within within the form
- All elements within one sub-array are columns in the row (Grid)

```
const elements: IFormRow<UpdateFolderDto>[] = [
    [
      FormHelper.createInput({
        formKey: "name",
        label: "Name",
        props: {
          type: "text",
        },
        rules: {
          required: { value: true },
        },
        defaultValue: folder.name,
      }),
      FormHelper.createTextArea({
        formKey: "description",
        label: "Description",
        props: {
          rows: 7,
        },
        defaultValue: folder.description,
      }),
      FormHelper.createTagSelect({
        formKey: "tags",
        label: "Tags",
        disabled: tagsIsError,
        props: {
          autocompleteOptions: tags
            ? tags.map((tag) => ({ value: tag.id, label: tag.label }))
            : [],
          isLoading: tagsIsLoading,
        },
        defaultValue: folder.tags,
      }),
    ]

  ];
```

3. Inject your form in the JSX part like this:
