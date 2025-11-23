import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, Check } from 'lucide-react'; 

/**
 * A reusable component for a single-select filter using the Shadcn Collapsible component.
 * It expects the selection state to be an array containing 0 or 1 item.
 * * @param {object} props
 * @param {string} props.title - The title displayed above the filter (e.g., "Categories").
 * @param {string[]} props.options - The array of available filter options (e.g., ['fragrances', 'skincare']).
 * @param {string[]} props.selectedValues - The array of currently selected values (e.g., ['fragrances']).
 * @param {(value: string | null) => void} props.onValueChange - The handler function called when an option is clicked.
 */
export function CollapsibleFilterSelect({
  title,
  options,
  selectedValues,
  onValueChange
}) {
  

  return (
     <Collapsible>
    {/* Collapsible Trigger (The Button that opens/closes the options) */}
    <CollapsibleTrigger asChild>
      <Button variant="outline" className="w-full justify-between capitalize">
        {/* Display the currently selected category */}
        {selectedValues
          ? selectedValues
          : 'All Categories'}
        {/* Rotate Chevron based on state for visual feedback */}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
      </Button>
    </CollapsibleTrigger>

    {/* Collapsible Content (The list of options that expands INLINE) */}
    <CollapsibleContent className="mt-2 space-y-1">
      
      {/* 1. Option to clear the filter */}
      <div 
        onClick={() => onValueChange('')} // Calling handler with null clears the filter
        className={`flex items-center justify-between p-2 rounded-md text-sm cursor-pointer hover:bg-gray-100 ${
          selectedValues === ''? 'bg-blue-100/70 font-medium' : ''
        }`}
      >
        <span>All {title}</span>
        {selectedValues==='' && <Check className="h-4 w-4 text-blue-600" />}
      </div>

      {/* 2. Map over categories for clickable items */}
      {options.map(option => {
        const isSelected = selectedValues.includes(option);

        return (
          <div
            key={option}
            onClick={() => onValueChange(option)}
            className={`flex items-center justify-between  rounded-md text-sm capitalize cursor-pointer hover:bg-gray-100 ${
              isSelected ? 'bg-blue-100/70 font-medium' : ''
            }`}
          >
            {option}
            {isSelected && <Check className="h-4 w-4 text-blue-600" />}
          </div>
        );
      })}
    </CollapsibleContent>
  </Collapsible>
  );
}