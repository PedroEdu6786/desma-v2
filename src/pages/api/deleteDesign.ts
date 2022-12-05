import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../lib/session';
import { deleteDesignSystem } from '../../services/designSystems/designSystems';

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { designId } = req.body;
    const token = req.session.user?.token as string;

    const response = await deleteDesignSystem(designId, token);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(registerRoute, sessionOptions);
