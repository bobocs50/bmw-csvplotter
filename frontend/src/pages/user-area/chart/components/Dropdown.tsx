import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export type ChartKind = 'LineChart' | 'ScatterChart' | 'AreaChart';

interface Props {
  setChartType: React.Dispatch<React.SetStateAction<ChartKind>>;
}

export default function Dropdown({ setChartType }: Props) {
    //Tailwind Free CopyPasta
  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex items-center gap-1 rounded-md px-3 bg-black h-9 text-sm font-semibold text-white">
        Options
        <ChevronDownIcon aria-hidden className="size-4 text-gray-300" />
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-gray-800 shadow-lg">
        <div className="py-1">
          {(['LineChart', 'ScatterChart', 'AreaChart'] as ChartKind[]).map(kind => (
            <MenuItem key={kind}>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={() => setChartType(kind)}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    focus ? 'bg-white/10 text-white' : 'text-gray-200'
                  }`}
                >
                  {kind}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}