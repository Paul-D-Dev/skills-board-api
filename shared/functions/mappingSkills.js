export const mappingSkills = (skill) => {
    return skill
        .trim()
        .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
        .split(',');
}
