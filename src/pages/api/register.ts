import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  const { token, userData } = req.body;

  try {
    const user = { token, userData };
    req.session.user = user;
    await req.session.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(registerRoute, sessionOptions);
