/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DisposableStore } from '../../../../base/common/lifecycle.js';
import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';
import { IQuickPick, IQuickPickItem } from '../../../../platform/quickinput/common/quickInput.js';

export const IQuickAccessExcludesState = createDecorator<IQuickAccessExcludesState>('quickAccessExcludesState');

export interface IQuickAccessExcludesState {
	readonly _serviceBrand: undefined;

	/**
	 * Stores the current state of whether excludes and ignore files should be used.
	 */
	useExcludesAndIgnoreFiles: boolean;

	setPicker(picker: IQuickPick<IQuickPickItem, { useSeparators: boolean }> | undefined): void;
}

/**
 * Shared state for the "Use Excludes and Ignore Files" toggle across quick access providers.
 */
export class QuickAccessExcludesState implements IQuickAccessExcludesState {
	readonly _serviceBrand: undefined;

	public useExcludesAndIgnoreFiles: boolean = true;

	private currentPicker: IQuickPick<IQuickPickItem, { useSeparators: boolean }> | undefined;
	private readonly disposables: DisposableStore = new DisposableStore();

	setPicker(picker: IQuickPick<IQuickPickItem, { useSeparators: boolean }> | undefined): void {
		if (this.currentPicker !== picker) {
			console.log('QuickAccessExcludesState#setPicker', { from: this.currentPicker, to: picker });

			this.disposables.clear();

			if (picker) {
				this.disposables.add(picker.onDidHide(() => {
					console.log('QuickAccessExcludesState#onDidHide', picker);
					this.useExcludesAndIgnoreFiles = true;
				}));

			}

			this.currentPicker = picker;
		}
	}
}
