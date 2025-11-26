
/**
 * A consistent, solid-style title component for e-commerce sections.
 * @param {string} title - The main text of the section title.
 * @param {string} [subtitle] - Optional smaller text to provide context or a call to action.
 * @param {string} [className] - Optional custom class to override outer styling.
 */
export function SectionTitle({ title, subtitle, className = '' }) {
  return (
    <div className={`mb-8 md:mb-12 ${className}`}>
      {/* Style 1: Bold Text with a Subtle Accent Line 
        The border-l-4 and pl-4 create a strong vertical accent.
      */}
      <h2 
        className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white 
                   border-l-4 border-yellow-500 pl-4 inline-block"
        aria-label={`Section: ${title}`}
      >
        {title}
      </h2>

      {/* Optional Subtitle */}
      {subtitle && (
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}