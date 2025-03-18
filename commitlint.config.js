export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [2, "always", ["feat", "fix", "doc", "refacto", "github", "config"]],
		"scope-empty": [0],
		"subject-case": [0],
		"header-max-length": [2, "always", 100]
	},
	parserPreset: {
		parserOpts: {
			headerPattern: /^(feat|fix|doc|refacto|github|config)(?:\(([0-9]+|hf)\)|:(\w+)(?:\(([0-9]+|hf)\))?):\s(.*)$/,
			headerCorrespondence: ["type", "scope", "breaking", "issue", "subject"]
		}
	}
};