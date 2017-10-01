import AbstractException from './abstract-exception';

class FormException extends AbstractException
{
  /**
   * Constructor
   * @param {String} message A human-readable description of the error.
   */
  constructor(message)
  {
    super(message);
  }
}

export default FormException;
