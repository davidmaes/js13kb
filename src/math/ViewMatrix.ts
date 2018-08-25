import Matrix from "./Matrix";

export default class ViewMatrix extends Matrix
{
    /**
     * @returns {Float32Array}
     */
    public getInvertedFloat32Array()
    {
        let m = this.getFloat32Array();

        let b00 = m[0] * m[5] - m[1] * m[4];
        let b01 = m[0] * m[6] - m[2] * m[4];
        let b02 = m[0] * m[7] - m[3] * m[4];
        let b03 = m[1] * m[6] - m[2] * m[5];
        let b04 = m[1] * m[7] - m[3] * m[5];
        let b05 = m[2] * m[7] - m[3] * m[6];
        let b06 = m[8] * m[13] - m[9] * m[12];
        let b07 = m[8] * m[14] - m[10] * m[12];
        let b08 = m[8] * m[15] - m[11] * m[12];
        let b09 = m[9] * m[14] - m[10] * m[13];
        let b10 = m[9] * m[15] - m[11] * m[13];
        let b11 = m[10] * m[15] - m[11] * m[14];

        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        det = 1.0 / det;

        return new Float32Array([
            (m[5] * b11 - m[6] * b10 + m[7] * b09) * det,
            (m[2] * b10 - m[1] * b11 - m[3] * b09) * det,
            (m[13] * b05 - m[14] * b04 + m[15] * b03) * det,
            (m[10] * b04 - m[9] * b05 - m[11] * b03) * det,
            (m[6] * b08 - m[4] * b11 - m[7] * b07) * det,
            (m[0] * b11 - m[2] * b08 + m[3] * b07) * det,
            (m[14] * b02 - m[12] * b05 - m[15] * b01) * det,
            (m[8] * b05 - m[10] * b02 + m[11] * b01) * det,
            (m[4] * b10 - m[5] * b08 + m[7] * b06) * det,
            (m[1] * b08 - m[0] * b10 - m[3] * b06) * det,
            (m[12] * b04 - m[13] * b02 + m[15] * b00) * det,
            (m[9] * b02 - m[8] * b04 - m[11] * b00) * det,
            (m[5] * b07 - m[4] * b09 - m[6] * b06) * det,
            (m[0] * b09 - m[1] * b07 + m[2] * b06) * det,
            (m[13] * b01 - m[12] * b03 - m[14] * b00) * det,
            (m[8] * b03 - m[9] * b01 + m[10] * b00) * det
        ]);
    }
}
