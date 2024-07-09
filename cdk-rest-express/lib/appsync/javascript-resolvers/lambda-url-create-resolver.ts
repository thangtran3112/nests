import { util } from '@aws-appsync/utils';

/**
 * NOTE: Only VTL Resolver is working properly. Something wrong here
 */
export function request(ctx) {
  return {
    version: '2018-05-29',
    method: 'POST',
    resourcePath: '/books',
    params: {
      headers: {
        'Content-Type': 'application/json',
      },
      body: ctx.args.input,
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    return util.error(ctx.error.message, ctx.error.type);
  }
  if (ctx.result.statusCode == 200 || ctx.result.statusCode == 201) {
    return ctx.result.body;
  } else {
    return util.appendError(ctx.result.body, 'ctx.result.statusCode');
  }
}
