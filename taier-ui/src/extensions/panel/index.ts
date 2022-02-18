/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import taskResultService from '@/services/taskResultService';
import molecule from '@dtinsight/molecule';
import type { UniqueId } from '@dtinsight/molecule/esm/common/types';
import type { IExtension } from '@dtinsight/molecule/esm/model';

export default class PanelExtension implements IExtension {
	id: UniqueId = 'panel';
	name: string = 'panel';
	activate(): void {
		// 关闭结果 panel 的时候清除 service 中存储的数据
		molecule.panel.onTabClose((panelId) => {
			const allResults = taskResultService.getState().results;
			if (Object.keys(allResults).includes(panelId.toString())) {
				taskResultService.clearResult(panelId.toString());
			}
		});
	}
	dispose(): void {
		throw new Error('Method not implemented.');
	}
}
