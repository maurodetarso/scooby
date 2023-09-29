import { Signal } from 'typed-signals';

import { ToggleAction, ToggleType } from './ToggleButton';
import { ToggleButtonGroup } from './ToggleButtonGroup';

export class OptionsPanel
{
    public div: HTMLDivElement;

    private typeGroup?: ToggleButtonGroup;
    private statusGroup?: ToggleButtonGroup;
    private miscGroup?:ToggleButtonGroup;
    public onBtnClick = new Signal();

    /**
     * Creates the options panel and inits each button group
     */
    public init(minimal = true): void
    {
        this.div = document.createElement('div');
        this.div.id = 'options-panel';

        if (!minimal)
        {
            this.initExtraFunctionality();
        }
    }

    private initExtraFunctionality(): void
    {
        this.typeGroup = new ToggleButtonGroup({
            text: 'type',
            buttonsData: {
                texture: { type: ToggleType.NORMAL, text: 'Textures' },
                misc: { type: ToggleType.NORMAL, text: 'Other' },
            },
        });

        this.statusGroup = new ToggleButtonGroup({
            text: 'status',
            buttonsData: {
                active: { type: ToggleType.ACTIVE, text: 'Active' },
                deleted: { type: ToggleType.DELETED, text: 'Deleted' },
            },
        });

        this.miscGroup = new ToggleButtonGroup({
            text: 'misc',
            buttonsData: {
                bitmap: {
                    type: ToggleType.KILL,
                    text: 'Kill createImageBitmap',
                    action: ToggleAction.TOGGLE_KILL_CREATE_IMAGE_BITMAP,
                },
                logs: { type: ToggleType.LOGS, text: 'Logs', action: ToggleAction.TOGGLE_LOGS },
            },
        });

        this.typeGroup.init(this.div);
        this.statusGroup.init(this.div);
        this.miscGroup.init(this.div);
    }

    /**
     * Sets up the listeners for each group
     */
    public setupListeners(): void
    {
        if (this.typeGroup)
        {
            this.typeGroup.setupListeners();
            this.typeGroup.onBtnClicked.connect((action) => this.onBtnClick.emit(action));
        }

        if (this.statusGroup)
        {
            this.statusGroup.setupListeners();
            this.statusGroup.onBtnClicked.connect((action) => this.onBtnClick.emit(action));
        }

        if (this.miscGroup)
        {
            this.miscGroup.setupListeners();
            this.miscGroup.onBtnClicked.connect((action) => this.onBtnClick.emit(action));
        }
    }

    public turnOnKillBitmap(): void
    {
        if (!this.miscGroup) return;

        this.miscGroup.getButton('bitmap').div.classList.add('toggled');
    }

    public turnOnLogs(): void
    {
        if (!this.miscGroup) return;

        this.miscGroup.getButton('logs').div.classList.add('toggled');
    }

    public isActiveTexturesOn(): boolean
    {
        if (!this.statusGroup) return true;

        return this.statusGroup.getButton('active').contains('toggled');
    }

    public isDeletedTexturesOn(): boolean
    {
        if (!this.statusGroup) return false;

        return this.statusGroup.getButton('deleted').contains('toggled');
    }

    public isRegularTexturesOn(): boolean
    {
        if (!this.typeGroup) return true;

        return this.typeGroup.getButton('texture').contains('toggled');
    }

    public isOtherTexturesOn(): boolean
    {
        if (!this.typeGroup) return true;

        return this.typeGroup.getButton('misc').contains('toggled');
    }

    public isLogsOn(): boolean
    {
        if (!this.miscGroup) return false;

        return this.miscGroup.getButton('logs').contains('toggled');
    }
}
