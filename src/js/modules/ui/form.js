import uniq from 'lodash/uniq';

/**
 * Returns the data extracted from an HTMLFormElement instance
 *
 * @function
 *
 * @param {HTMLFormElement} form - the HTMLFormElement instance
 *
 * @returns {Object} an object with key-value pairs representing the data
 */
const getData = (form) => {

  return Object.entries(getFieldsElementsMap(form)).reduce((output, field) => {

    const name = field[0];
    const elements = field[1];

    // NOTE: multiple elements have the same "name" attribute
    if (elements.length > 1)
    {
      const checkedInputs = elements.filter(el => isCheckableInput(el) && el.checked);
      const checkedRadio = checkedInputs.find(el => el.type === "radio");

      if (checkedRadio)
      {
        output[name] = checkedRadio.value;
      }
      else if (checkedInputs.length > 0)
      {
        output[name] = checkedInputs.map(el => el.value);
      }
      else
      {
        output[name] = undefined;
      }
    }
    else if (isCheckableInput(elements[0]))
    {
      output[name] = elements[0].checked;
    }
    else
    {
      output[name] = elements[0].value;
    }

    return output;

  }, {});
};


/**
 * Returns the fields of an HTMLFormElement instance
 *
 * @function
 *
 * @param {HTMLFormElement} form                - the HTMLFormElement instance
 * @param {Boolean}         [hiddenFields=true] - adds hidden fields (i.e. input[type="hidden"]) to the list
 *
 * @returns {HTMLElement[]} - a list of html elements
 */
const getFieldsElements = (form, hiddenFields = true) => [].slice.call(form.querySelectorAll("*[name]")).filter(e => hiddenFields || !isHiddenInput(e));


/**
 * Returns the fields of an HTMLFormElement instance in an object with each key corresponding to the name of the field
 *
 * @param {HTMLFormElement} form                - the HTMLFormElement instance
 * @param {Boolean}         [hiddenFields=true] - adds hidden fields (i.e. input[type="hidden"]) to the list
 *
 * @returns {Object} - an object containing the fields of the form
 */
const getFieldsElementsMap = (form, hiddenFields = true) => getFieldsElements(form, hiddenFields).reduce((output, el) => {

  if (!output[el.name])
  {
    output[el.name] = [];
  }

  output[el.name].push(el);

  return output;

}, {});


/**
 * Returns the fields names of an HTMLFormElement instance
 *
 * @function
 *
 * @param {HTMLFormElement} form                - the HTMLFormElement instance
 * @param {Boolean}         [hiddenFields=true] - adds hidden fields (i.e. input[type="hidden"]) to the list
 *
 * @returns {string[]} - the names of the fields
 */
const getFieldsNames = (form, hiddenFields = true) => uniq(getFieldsElements(form, hiddenFields).map(e => e.name));


/**
 * Checks if the element is an HTMLInputElement that can be considered as checked (i.e. input radios and checkboxes)
 *
 * @function
 *
 * @param {HTMLElement} el - The element to check
 *
 * @returns {boolean} Returns true if the element is valid or false otherwise.
 */
const isCheckableInput = el => el instanceof HTMLInputElement && ["checkbox", "radio"].indexOf(el.type) > -1;


/**
 * Checks if the element is an instance of HTMLFormElement (HTML form tag)
 *
 * @function
 *
 * @param {HTMLElement} el - The element to check
 *
 * @returns {boolean} Returns true if the element is valid or false otherwise.
 */
const isFormElement = el => el instanceof HTMLFormElement;


/**
 * Checks if the element is a hidden instance of HTMLInputElement (HTML input tag)
 *
 * @function
 *
 * @param {HTMLElement} el - The element to check
 *
 * @returns {boolean} Returns true if the element is valid or false otherwise.
 */
const isHiddenInput = el => el instanceof HTMLInputElement && el.type === "hidden";


/*
 * Exports
 */
export {
  getData,
  getFieldsElements,
  getFieldsElementsMap,
  getFieldsNames,
  isCheckableInput,
  isFormElement,
  isHiddenInput
};
