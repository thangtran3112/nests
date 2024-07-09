import { CreateMemoRequest } from './type';
import { Handler } from '../../common/express';

export const createMemo: Handler = async (req, res) => {
  const request = (await req.body) as CreateMemoRequest;
  const { title, content } = request;
  return { title, content };
};

export const getMemos: Handler = async (req, res) => {
  return { title: 'Hello', content: 'World' };
};
