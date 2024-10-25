import { Typography } from '../../../../components';

type FieldDescriptionProps = {
  title: string;
  subtitle: string;
};

export const FieldDescription = ({
  title,
  subtitle,
}: FieldDescriptionProps) => (
  <div>
    <Typography variant="body1" sx={{ mb: 0.5 }}>
      {title}
    </Typography>
    <Typography variant="body2" fontWeight={400} sx={{ mb: 1.5 }}>
      {subtitle}
    </Typography>
  </div>
);
