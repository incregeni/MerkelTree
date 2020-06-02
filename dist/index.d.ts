/// <reference types="node" />
interface Options {
    /** If set to `true`, an odd node will be duplicated and combined to make a pair to generate the layer hash. */
    duplicateOdd?: boolean;
    /** If set to `true`, an odd node will not have a pair generating the layer hash. */
    singleOdd?: boolean;
    /** If set to `true`, the leaves will hashed using the set hashing algorithms. */
    hashLeaves?: boolean;
    /** If set to `true`, constructs the Merkle Tree using the [Bitcoin Merkle Tree implementation](http://www.righto.com/2014/02/bitcoin-mining-hard-way-algorithms.html). Enable it when you need to replicate Bitcoin constructed Merkle Trees. In Bitcoin Merkle Trees, single nodes are combined with themselves, and each output hash is hashed again. */
    isBitcoinTree?: boolean;
    /** If set to `true`, the leaves will be sorted. */
    sortLeaves?: boolean;
    /** If set to `true`, the hashing pairs will be sorted. */
    sortPairs?: boolean;
    /** If set to `true`, the leaves and hashing pairs will be sorted. */
    sort?: boolean;
}
declare type THashAlgo = any;
declare type TValue = any;
declare type TLeaf = any;
declare type TLayer = any;
/**
 * Class reprensenting a Merkle Tree
 * @namespace MerkleTree
 */
export declare class MerkleTree {
    duplicateOdd: boolean;
    singleOdd: boolean;
    hashAlgo: (value: TValue) => THashAlgo;
    hashLeaves: boolean;
    isBitcoinTree: boolean;
    leaves: TLeaf[];
    layers: TLayer[];
    sortLeaves: boolean;
    sortPairs: boolean;
    sort: boolean;
    /**
     * @desc Constructs a Merkle Tree.
     * All nodes and leaves are stored as Buffers.
     * Lonely leaf nodes are promoted to the next level up without being hashed again.
     * @param {Buffer[]} leaves - Array of hashed leaves. Each leaf must be a Buffer.
     * @param {Function} hashAlgorithm - Algorithm used for hashing leaves and nodes
     * @param {Object} options - Additional options
     * @example
     *```js
     *const MerkleTree = require('merkletreejs')
     *const crypto = require('crypto')
     *
     *function sha256(data) {
     *  // returns Buffer
     *  return crypto.createHash('sha256').update(data).digest()
     *}
     *
     *const leaves = ['a', 'b', 'c'].map(x => keccak(x))
     *
     *const tree = new MerkleTree(leaves, sha256)
     *```
     */
    constructor(leaves: any, hashAlgorithm: any, options?: Options);
    createHashes(nodes: any): void;
    /**
     * getLeaves
     * @desc Returns array of leaves of Merkle Tree.
     * @return {Buffer[]}
     * @example
     *```js
     *const leaves = tree.getLeaves()
     *```
     */
    getLeaves(data?: any[]): any[];
    /**
     * getHexLeaves
     * @desc Returns array of leaves of Merkle Tree as hex strings.
     * @return {String[]}
     * @example
     *```js
     *const leaves = tree.getHexLeaves()
     *```
     */
    getHexLeaves(): string[];
    /**
     * getLayers
     * @desc Returns multi-dimensional array of all layers of Merkle Tree, including leaves and root.
     * @return {Buffer[]}
     * @example
     *```js
     *const layers = tree.getLayers()
     *```
     */
    getLayers(): any[];
    /**
     * getHexLayers
     * @desc Returns multi-dimensional array of all layers of Merkle Tree, including leaves and root as hex strings.
     * @return {String[]}
     * @example
     *```js
     *const layers = tree.getHexLayers()
     *```
     */
    getHexLayers(): any;
    /**
     * getLayersFlat
     * @desc Returns single flat array of all layers of Merkle Tree, including leaves and root.
     * @return {Buffer[]}
     * @example
     *```js
     *const layers = tree.getLayersFlat()
     *```
     */
    getLayersFlat(): any;
    /**
     * getHexLayersFlat
     * @desc Returns single flat array of all layers of Merkle Tree, including leaves and root as hex string.
     * @return {String[]}
     * @example
     *```js
     *const layers = tree.getHexLayersFlat()
     *```
     */
    getHexLayersFlat(): any;
    /**
     * getRoot
     * @desc Returns the Merkle root hash as a Buffer.
     * @return {Buffer}
     * @example
     *```js
     *const root = tree.getRoot()
     *```
     */
    getRoot(): any;
    /**
     * getHexRoot
     * @desc Returns the Merkle root hash as a hex string.
     * @return {String}
     * @example
     *```js
     *const root = tree.getHexRoot()
     *```
     */
    getHexRoot(): string;
    /**
     * getProof
     * @desc Returns the proof for a target leaf.
     * @param {Buffer} leaf - Target leaf
     * @param {Number} [index] - Target leaf index in leaves array.
     * Use if there are leaves containing duplicate data in order to distinguish it.
     * @return {Object[]} - Array of objects containing a position property of type string
     * with values of 'left' or 'right' and a data property of type Buffer.
     *@example
     * ```js
     *const proof = tree.getProof(leaves[2])
     *```
     *
     * @example
     *```js
     *const leaves = ['a', 'b', 'a'].map(x => keccak(x))
     *const tree = new MerkleTree(leaves, keccak)
     *const proof = tree.getProof(leaves[2], 2)
     *```
     */
    getProof(leaf: any, index?: any): any[];
    getProofIndices(treeIndices: any, depth: any): any[];
    getMultiProof(tree: any, indices: any): any[];
    getHexMultiProof(tree: any, indices: any): string[];
    bufIndexOf(arr: any, el: any): number;
    getProofFlags(els: any, proofs: any): any[];
    getPairElement(idx: any, layer: any): any;
    getHexProof(leaf: any, index?: any): string[];
    /**
     * verify
     * @desc Returns true if the proof path (array of hashes) can connect the target node
     * to the Merkle root.
     * @param {Object[]} proof - Array of proof objects that should connect
     * target node to Merkle root.
     * @param {Buffer} targetNode - Target node Buffer
     * @param {Buffer} root - Merkle root Buffer
     * @return {Boolean}
     * @example
     *```js
     *const root = tree.getRoot()
     *const proof = tree.getProof(leaves[2])
     *const verified = tree.verify(proof, leaves[2], root)
     *```
     */
    verify(proof: any, targetNode: any, root: any): boolean;
    verifyMultiProof(root: any, indices: any, leaves: any, depth: any, proof: any): any;
    getDepth(): number;
    getLayersAsObject(): any;
    print(): void;
    toTreeString(): any;
    toString(): any;
    static bufferify(x: any): any;
    static isHexStr(v: any): boolean;
    static print(tree: any): void;
    _bufferToHex(value: Buffer): string;
    _bufferify(x: any): any;
    _bufferifyFn(f: any): (x: any) => Buffer;
    _isHexStr(v: any): boolean;
    _log2(x: any): any;
    _zip(a: any, b: any): any;
}
export default MerkleTree;
