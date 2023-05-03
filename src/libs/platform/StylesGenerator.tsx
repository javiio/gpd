import cn from 'classnames';

export default function StylesGenerator() {
  return (
    <div
      className={cn(
        'hidden',
        'border-yellow-500 bg-yellow-500 bg-yellow-500/10',
        'border-green-500 bg-green-500 bg-green-500/25'
      )}
    />
  );
}
