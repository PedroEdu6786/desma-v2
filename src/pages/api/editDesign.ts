import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../lib/session';
import { editDesignSystem } from '../../services/designSystems/designSystems';
import { editFont, Font } from '../../services/fonts/fonts';
import { editPalette, Palette } from '../../services/palettes/palettes';
import { editSpacing, Spacing } from '../../services/spacings/spacings';

type EditDesignBody = {
  designId: string;
  name: string;
  palette: Palette;
  spacing: Spacing;
  fonts: Font;
  paletteId: string;
  spacingId: string;
  fontsId: string;
};

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, designId, palette, spacing, fonts, paletteId, spacingId, fontsId } =
      req.body as EditDesignBody;
    const token = req.session.user?.token as string;

    const response = await Promise.all([
      editDesignSystem(name, designId, token),
      editFont(fonts, fontsId, token),
      editSpacing(spacing, spacingId, token),
      editPalette(palette, paletteId, token),
    ]);

    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(registerRoute, sessionOptions);
