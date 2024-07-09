import { util } from '@aws-appsync/utils';

export function request(ctx) {
  return {
    version: '2018-05-29',
    method: 'GET',
    params: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    resourcePath: `/prod/books`,
    // resourcePath: `prod/books/${ctx.args.id}`,
  };
}

export function response(ctx) {
  const { statusCode, body } = ctx.result;
  // if response is 200, return the response
  if (statusCode === 200) {
    return JSON.parse(body);
  }
  // if response is not 200, append the response to error block.
  util.appendError(body, statusCode);
}
