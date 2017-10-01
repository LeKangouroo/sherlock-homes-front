import AbstractException from './abstract-exception';

class RouterException extends AbstractException
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

export default RouterException;
