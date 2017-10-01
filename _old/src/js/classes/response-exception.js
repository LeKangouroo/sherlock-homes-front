import AbstractException from './abstract-exception';

class ResponseException extends AbstractException
{
  constructor(message)
  {
    super(message);
  }
}

export default ResponseException;
