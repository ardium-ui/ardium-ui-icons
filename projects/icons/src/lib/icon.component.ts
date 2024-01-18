import {
    Component,
    Input,
    signal,
    Inject,
    InjectionToken,
} from '@angular/core';
import { coerceBooleanProperty } from '@ardium-ui/devkit';
    import { isDefined } from 'simple-bool';

const _DEFAULT_ICON = 'question-mark';

export type ArdiumIconDefaults = {
    icon?: string;
    filled?: boolean;
    size?: number | string;
};

export const ARDIUM_ICON_DEFAULTS = new InjectionToken<ArdiumIconDefaults>(
    'ardium-icon-defaults'
);

@Component({
    selector: 'lib-icons',
    standalone: true,
    imports: [],
templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
})
export class ArdiumIconComponent {
    constructor(@Inject(ARDIUM_ICON_DEFAULTS) defaults: ArdiumIconDefaults) {
        if (isDefined(defaults.icon)) this._icon = defaults.icon;
        if (isDefined(defaults.size)) this._size = defaults.size;
        if (isDefined(defaults.filled)) this._filled = defaults.filled;
    }

    readonly icon = signal<string | null>(_DEFAULT_ICON);
    @Input()
    private set _icon(v: string | null | undefined) {
        this.icon.set(v ?? null);
    }

    readonly filled = signal<boolean>(false);
    @Input('filled')
    private set _filled(v: any) {
        this.filled.set(coerceBooleanProperty(v));
    }

    readonly size = signal<string>('24px');
    @Input('size')
    private set _size(v: any) {
        v = String(v);
        if (!v.match(/^\d+(\.\d+)(cm|mm|Q|in|pc|pt|px|em|ex|ch|rem|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|%)$/)) {
            throw new TypeError(`ICN-NF001: Invalid icon size "${v}". Expected number or number with css unit.`);
        }
        if (v.match(/^\d+(\.\d+)?$/)) {
            v = v + 'px';
        }
        this.size.set(v);
    }

    private _normalizeString(value: string): string {
        value = value.trim().toLowerCase();
        value = value.replace(/[ _]/g, '-');
        return value;
    }
    getIconSrc(value: string): string {
        value = this._normalizeString(value);
        return `/assets/${value}.svg`;
    }
    getIconAlt(value: string): string {
        value = this._normalizeString(value);
        value = value.replace('-', ' ');
        return value;
    }
}
