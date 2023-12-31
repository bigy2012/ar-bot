module.exports = (existingCommand, localCommand) => {
    const areOptionDifferent = (existingChoices, localChoices) => {
        for (const localChoice of localChoices) {
            const existingChoice = existingChoices?.find(
                (choice) => choice.name == localChoice.name
            )

            if (!existingChoice) {
                return true;
            }

            if (localChoice.value !== existingChoice.value) {
                return true;
            }

        }
        return false;
    }
    const areOptionsDifferent = (existingOptions, localOptions) => {
        for (const localOption of localOptions) {
            const existingOption = existingOptions?.find(
                (option) => option.name == localOption.name
            )

            if (!existingOption) {
                return true;
            }

            if (localOption.value !== existingOption.value) {
                return true;
            }

        }
        return false;
    }




    if(
        existingCommand.description !== localCommand.description || 
        existingCommand.options?.length !== (localCommand.options?.length || 0) ||
        areCommandDifferent(existingCommand.options, localCommand.options || [])
    ){
        return true;
    }



    return false;

}