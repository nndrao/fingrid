The CUSTOM_ELEMENTS_SCHEMA is required when using components that Angular doesn't recognize by default, like third-party components or web components. It tells Angular's template compiler to:

Skip validation for custom elements
Allow non-standard element names
Permit unknown attributes on elements

Without it, Angular's strict template checking would throw errors for any unrecognized elements like <p-button>, even if they're valid PrimeNG components.
This is particularly important when using UI libraries like PrimeNG that implement custom elements. The schema relaxes Angular's strict checking while maintaining other validations.
