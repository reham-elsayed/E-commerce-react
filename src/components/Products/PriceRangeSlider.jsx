
import Input from '../ui/input';
import { Slider } from '../ui/slider';

// Define the maximum possible price range for the slider
const MAX_PRICE = 1000;
const MIN_PRICE = 0;

// The component accepts the current price range array and a function to handle changes (optional for now)
export function PriceRangeSlider({ currentRange = [MIN_PRICE, MAX_PRICE],handlePriceChange }) {
  // We use local state (or a prop value) to manage the slider position.
  // We'll use a placeholder state value for now since you asked to skip functionality.

  const [min, max] = currentRange;

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-semibold text-lg">Price Range</h3>
      
      {/* --- Price Range Display and Slider --- */}
      <div className="flex flex-col gap-4">
        
        {/* Price Display */}
        <div className="flex justify-between items-center text-sm font-medium">
          <span>Min: <span className="font-bold text-gray-800">${min}</span></span>
          <span>Max: <span className="font-bold text-gray-800">${max}</span></span>
        </div>
        
        {/* Shadcn Slider Component */}
        <div className="px-1 pt-2">
          <Slider
            // The range value that the slider uses
            value={currentRange}
            // Temporarily set the change handler to update local state (no external side effects)
            onValueChange={handlePriceChange}
            
            // Configuration for the full range
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={5} // Stepping by 10 makes interaction smoother
            
            // Standard Shadcn style props
            className="w-full"
          />
        </div>
      </div>
      
      {/* --- Manual Input Fields (Optional but helpful) --- */}
      <div className="flex gap-4">
        <Input
          type="number"
          placeholder="Min Price"
          value={min}
          // The Input is display-only right now; its value is driven by the slider/rangeValue state
          readOnly 
          className="text-sm text-center"
        />
        <Input
          type="number"
          placeholder="Max Price"
          value={max}
          // The Input is display-only right now
          readOnly 
          className="text-sm text-center"
        />
      </div>
    </div>
  );
}