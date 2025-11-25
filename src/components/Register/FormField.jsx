export const FormField = ({ field, formik }) => {
    // Edge case: Ensure value is retrieved safely, even if formik.values is incomplete
    const fieldValue = formik.values[field.name] || '';
    const isTouched = formik.touched[field.name];
    const error = formik.errors[field.name];
    const showError = isTouched && error;

    return (
        <div className='my-5'>
            <label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {field.label}
            </label>
            <input
                name={field.name}
                type={field.type}
                id={field.name}
                placeholder={field.placeholder}
                onChange={formik.handleChange}
                value={fieldValue}
                onBlur={formik.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {showError && (
                <div className="bg-red-200 border-2 border-red-400 px-5 py-2 rounded-md m-1 text-red-800">
                    {error}
                </div>
            )}
        </div>
    );
};


