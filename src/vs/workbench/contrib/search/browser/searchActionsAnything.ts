/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action2, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { KeyCode, KeyMod } from '../../../../base/common/keyCodes.js';
import { localize } from '../../../../nls.js';
import { InQuickInputContextKey } from '../../../../platform/quickinput/browser/quickInput.js';
import { IQuickInputService } from '../../../../platform/quickinput/common/quickInput.js';
import * as Constants from '../common/constants.js';
import { UseExcludesAndIgnoreFilesToggle } from './anythingQuickAccess.js';
import { ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';

registerAction2(class AnythingQuickAccessToggleExcludesAction extends Action2 {
	constructor() {
		super({
			id: Constants.SearchCommandIds.ToggleQuickAccessExcludesAndIgnoreFiles,
			title: localize('toggleUseExcludesAndIgnoreFiles', "Toggle Use Exclude Settings and Ignore Files"),
			keybinding: {
				when: InQuickInputContextKey,
				primary: KeyMod.CtrlCmd | KeyCode.Period,
				weight: 200,
			}
		});
	}

	run(accessor: ServicesAccessor): void {
		const quickInputService = accessor.get(IQuickInputService);
		const currentQuickInput = quickInputService.currentQuickInput;

		currentQuickInput
			?.toggles
			?.find(toggle => toggle instanceof UseExcludesAndIgnoreFilesToggle)
			?.toggle();
	}
});
