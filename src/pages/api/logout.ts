import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../lib/session';

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.status(200).json({});
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
