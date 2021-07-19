const { sendInput } = require('./pipelineRouter');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('sendInput controller', () => {
  let mRes;
  beforeEach(() => {
    mRes = mockResponse();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return status 401 if there is no body', () => {
    const mReq = { body: { input: '' } };
    sendInput(mReq, mRes);

    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.json).toBeCalledWith({
      success: false,
      message: 'Invalid input. Enter either a string or an array of numbers.',
    });
  });
});
