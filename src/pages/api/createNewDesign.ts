import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import { createNewFont, Font } from '../../services/fonts/fonts';
import { createNewSpacing, Spacing } from '../../services/spacings/spacings';
import { createNewPalette, Palette } from '../../services/palettes/palettes';
import { createDesignSystem } from '../../services/designSystems/designSystems';

type NewDesignSystemBody = {
  name: string;
  palette: Palette;
  spacing: Spacing;
  fonts: Font;
};

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, palette, spacing, fonts } = req.body as NewDesignSystemBody;
    const userId = req.session.user?.userData._id as string;
    const token = req.session.user?.token as string;

    const [registeredFont, registeredSpacing, registeredPalette] = await Promise.all([
      createNewFont(fonts, token),
      createNewSpacing(spacing, token),
      createNewPalette(palette, token),
    ]);

    const designSystem = await createDesignSystem(
      {
        name,
        userId,
        fontsId: registeredFont._id,
        spacingsId: registeredSpacing._id,
        paletteId: registeredPalette._id,
      },
      token
    );

    res.status(200).json(designSystem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(registerRoute, sessionOptions);
